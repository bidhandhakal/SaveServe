import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="relative flex flex-col items-center justify-center gap-8 py-0 lg:py-10">
          <div>
            <h1 className="text-4xl font-bold">SaveServe</h1>
            <p className="text-lg text-muted-foreground">
              SaveServe is a platform that helps you save money on your daily
              expenses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
