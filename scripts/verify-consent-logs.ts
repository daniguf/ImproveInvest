// scripts/verify-consent-logs.ts
import { verifyLogIntegrity } from '@/lib/consent-logger';

async function main() {
  console.log('Verifying consent log integrity...');
  const result = await verifyLogIntegrity();
  
  if (result.valid) {
    console.log('✅ Log chain is valid and untampered.');
    if (result.message) {
      console.log(`ℹ️  ${result.message}`);
    }
    process.exit(0);
  } else {
    console.error('❌ Log integrity check failed:', result.error);
    process.exit(1);
  }
}

main().catch(console.error);