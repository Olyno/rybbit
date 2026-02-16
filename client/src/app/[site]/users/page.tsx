"use client";

import { DisabledOverlay } from "../../../components/DisabledOverlay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/basic-tabs";
import { useSetPageTitle } from "../../../hooks/useSetPageTitle";
import { USER_PAGE_FILTERS } from "../../../lib/filterGroups";
import { SubHeader } from "../components/SubHeader/SubHeader";
import { TraitsExplorer } from "./components/TraitsExplorer";
import { UsersTable } from "./components/UsersTable";

export default function UsersPage() {
  useSetPageTitle("Users");

  return (
    <DisabledOverlay message="Users" featurePath="users">
      <div className="p-2 md:p-4 max-w-[1400px] mx-auto space-y-3">
        <SubHeader availableFilters={USER_PAGE_FILTERS} />
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="traits">Traits</TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <UsersTable />
          </TabsContent>
          <TabsContent value="traits">
            <TraitsExplorer />
          </TabsContent>
        </Tabs>
      </div>
    </DisabledOverlay>
  );
}
