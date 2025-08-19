import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat32 "mo:base/Nat32";
import Iter "mo:base/Iter";

actor {
	let principalHash = func (p : Principal) : Hash.Hash {
		var acc : Nat32 = 2166136261;
		let C : Nat32 = Nat32.fromNat(16777619);
		for (b in Principal.toBlob(p).vals()) {
			let v : Nat32 = Nat32.fromNat(Nat8.toNat(b));
			acc := acc +% v;
			acc := acc *% C;
		};
		acc
	};

	type Account = {
		owner : Principal;
		subaccount : ?Blob;
	};

	stable var balancesEntries : [(Principal, Nat)] = [];
	stable var allowancesEntries : [((Principal, Principal), Nat)] = [];
	var balances : HashMap.HashMap<Principal, Nat> = HashMap.HashMap(64, Principal.equal, principalHash);
	var allowances : HashMap.HashMap<(Principal, Principal), Nat> = HashMap.HashMap(64, func(a:(Principal,Principal),(b:(Principal,Principal)))=>(a==b), func(x:(Principal,Principal)) : Hash.Hash { principalHash(x.0) +% principalHash(x.1) });

	stable var symbol_ : Text = "APTC";
	stable var name_ : Text = "Test APTC";
	stable var decimals_ : Nat = 8;
	stable var fee_ : Nat = 10000;

	stable var minter : ?Principal = null;

	system func preupgrade() {
		balancesEntries := Iter.toArray(balances.entries());
		allowancesEntries := Iter.toArray(allowances.entries());
	};
	system func postupgrade() {
		balances := HashMap.HashMap(64, Principal.equal, principalHash);
		for ((p, n) in balancesEntries.vals()) { balances.put(p, n); };
		allowances := HashMap.HashMap(64, func(a:(Principal,Principal),(b:(Principal,Principal)))=>(a==b), func(x:(Principal,Principal)) : Hash.Hash { principalHash(x.0) +% principalHash(x.1) });
		for ((k, n) in allowancesEntries.vals()) { allowances.put(k, n); };
	};

	public shared ({caller}) func set_minter(p : Principal) : async () { minter := ?p };

	public shared ({caller}) func mint_to(to : Principal, amount : Nat) : async () {
		switch (minter) { case (?m) { assert caller == m }; case null { assert false }; };
		let cur = switch (balances.get(to)) { case (?n) n; case null 0 };
		balances.put(to, cur + amount);
	};

	public query func icrc1_symbol() : async Text { symbol_ };
	public query func icrc1_decimals() : async Nat { decimals_ };
	public query func icrc1_fee() : async Nat { fee_ };
	public query func icrc1_balance_of(a : Account) : async Nat {
		switch (balances.get(a.owner)) { case (?n) n; case null 0 };
	};

	public shared ({caller}) func icrc1_transfer(args : {
		from_subaccount : ?Blob;
		to : Account;
		amount : Nat;
		fee : ?Nat;
		memo : ?Blob;
		created_at_time : ?Nat64;
	}) : async { block_index : ?Nat } {
		let fromOwner = caller;
		let total = args.amount + (switch(args.fee){case(null)0;case(?f)f});
		let fromBal = switch (balances.get(fromOwner)) { case (?n) n; case null 0 };
		assert fromBal >= total;
		balances.put(fromOwner, fromBal - total);
		let toBal = switch (balances.get(args.to.owner)) { case (?n) n; case null 0 };
		balances.put(args.to.owner, toBal + args.amount);
		return { block_index = null };
	};

	public shared ({caller}) func icrc2_approve(args : {
		from_subaccount : ?Blob;
		spender : Principal;
		amount : Nat;
		expected_allowance : ?Nat;
		expires_at : ?Nat64;
		fee : ?Nat;
		memo : ?Blob;
		created_at_time : ?Nat64;
	}) : async { block_index : ?Nat } {
		let owner = caller;
		allowances.put((owner, args.spender), args.amount);
		return { block_index = null };
	};

	public shared ({caller}) func icrc2_transfer_from(args : {
		from : Account;
		to : Account;
		amount : Nat;
		fee : ?Nat;
		memo : ?Blob;
		created_at_time : ?Nat64;
		spender_subaccount : ?Blob;
	}) : async { block_index : ?Nat } {
		let key = (args.from.owner, caller);
		let total = args.amount + (switch(args.fee){case(null)0;case(?f)f});
		let allowance = switch (allowances.get(key)) { case (?n) n; case null 0 };
		assert allowance >= total;
		let fromBal = switch (balances.get(args.from.owner)) { case (?n) n; case null 0 };
		assert fromBal >= total;
		balances.put(args.from.owner, fromBal - total);
		let toBal = switch (balances.get(args.to.owner)) { case (?n) n; case null 0 };
		balances.put(args.to.owner, toBal + args.amount);
		allowances.put(key, allowance - total);
		return { block_index = null };
	};
}

