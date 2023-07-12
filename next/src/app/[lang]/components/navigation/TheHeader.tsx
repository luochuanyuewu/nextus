import { readItem } from "@directus/sdk/rest";
import { getDirectusSDK } from "../../utils/useDirectusSDK";
import MenuItem from "./MenuItem";
import { NavigationItem } from "@/types/schemas";
import VButton from "../base/VButton";

export default async function TheHeader() {
  const { api } = getDirectusSDK();

  const results = await api.request(
    readItem("navigation", "main", {
      // @ts-ignore
      fields: ["items.*", "items.page.slug", "items.children.*"],
    })
  );

  const { items } = results as any;

  return (
    <div>
      <header className="relative w-full space-y-4 md:flex md:items-center md:space-x-6 md:space-y-0">
        <div className="flex items-center bg-gray-800 md:justify-between rounded-tl-xl rounded-br-xl md:flex-1">
          <nav
            className="hidden font-mono md:flex md:space-x-4 lg:space-x-6"
            aria-label="Global"
          >
            {items.map((item: NavigationItem) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </nav>
          <div className="flex items-center justify-end flex-shrink-0 p-3 space-x-2">
            {/* <DarkModeToggle className="hidden text-gray-200 md:block hover:text-gray-400" /> */}
          </div>
        </div>

        <div className="hidden md:block">
          <VButton href="/contact-us" variant="primary" className="uppercase">
            {"Let's Talk"}
          </VButton>
        </div>

        {/* <NavigationMobileMenu navigation={navigation} /> */}
      </header>
    </div>
  );
}
