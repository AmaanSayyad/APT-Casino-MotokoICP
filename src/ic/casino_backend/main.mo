import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

actor {
  // Balance map in cycles (for demo only; not production-grade)
  stable var balances : HashMap.HashMap<Principal, Nat> = HashMap.HashMap<Principal, Nat>(10, Principal.equal, Principal.hash);

  public query func get_balance_of(p : Principal) : async Nat {
    switch (balances.get(p)) {
      case (?n) n;
      case null 0;
    };
  };

  public shared ({ caller }) func deposit(amount : Nat) : async () {
    let current = switch (balances.get(caller)) { case (?n) n; case null 0 };
    balances.put(caller, current + amount);
  };

  public shared ({ caller }) func withdraw_all() : async Nat {
    let current = switch (balances.get(caller)) { case (?n) n; case null 0 };
    balances.put(caller, 0);
    return current;
  };
}


