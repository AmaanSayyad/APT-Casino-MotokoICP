import { CASINO_CANISTER_ID, IC_HOST } from '@/config/ic';
import { getCasinoActor as getICPCasinoActor } from '@/lib/ic/icpActors';

export const getCasinoActor = async (identity) => {
  if (!CASINO_CANISTER_ID) throw new Error('CASINO_CANISTER_ID is not set');
  if (!identity) throw new Error('User must be connected to access casino');
  
  return getICPCasinoActor(identity);
};


