import Header from "@/components/Header";
import CampaignChips from "@/components/CampaignChips";
import { auth } from "@/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <>
      <Header user={session?.user} />
      <div className="mx-auto w-full max-w-7xl">
        <CampaignChips />
      </div>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-12 sm:px-6">
        {children}
      </main>
    </>
  );
}
