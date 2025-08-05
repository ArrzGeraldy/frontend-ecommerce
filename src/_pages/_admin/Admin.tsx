import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BarChart2,
  ChartNoAxesCombined,
  TrendingUp,
  UsersRound,
} from "lucide-react";

const Admin = () => {
  return (
    <div className="p-4">
      {/* card */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <div className="px-4">
            <div className="flex items-center gap-2">
              <div className="border px-2 py-1 rounded-md border-border bg-blue-500">
                <BarChart2 className="text-white" />
              </div>
              <span className="font-medium">Revenue</span>
            </div>

            <p className="text-2xl font-semibold mt-2">$ 127.000</p>

            <div className="text-muted-foreground text-sm mt-4 flex gap-1 items-center">
              <ChartNoAxesCombined size={18} />
              Visitors for the last 6 months
            </div>
          </div>
        </Card>
        <Card>
          <div className="px-4">
            <div className="flex items-center gap-2">
              <div className="border px-2 py-1 rounded-md border-border bg-green-500">
                <TrendingUp className="text-white" />
              </div>
              <span className="font-medium">Profit</span>
            </div>

            <p className="text-2xl font-semibold mt-2">$ 127.000</p>

            <div className="text-muted-foreground text-sm mt-4 flex gap-1 items-center">
              <ChartNoAxesCombined size={18} />
              Visitors for the last 6 months
            </div>
          </div>
        </Card>
        <Card>
          <div className="px-4">
            <div className="flex items-center gap-2">
              <div className="border px-2 py-1 rounded-md border-border bg-orange-500">
                <UsersRound className="text-white" />
              </div>
              <span className="font-medium">Users</span>
            </div>

            <p className="text-2xl font-semibold mt-2">100</p>

            <div className="text-muted-foreground text-sm mt-4 flex gap-1 items-center">
              <ChartNoAxesCombined size={18} />
              Visitors for the last 6 months
            </div>
          </div>
        </Card>
      </div>
      <Button>Button</Button>
    </div>
  );
};

export default Admin;
