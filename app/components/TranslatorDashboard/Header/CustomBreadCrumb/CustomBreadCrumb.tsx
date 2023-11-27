import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

const BREAD_CRUMB_ROUTES_MAPPING = {
  "translator-page": {
    displayName: "Tradutor",
    route: "translator-page",
  },
} as const;

const CustomBreadCrumb = () => {
  const paths = usePathname();
  const pathNames = paths
    .split("/")
    ?.filter((path) => path)
    ?.map((path) => ({
      ...BREAD_CRUMB_ROUTES_MAPPING[
        path as keyof typeof BREAD_CRUMB_ROUTES_MAPPING
      ],
    }));

  const homePath = {
    displayName: "Home",
    route: "",
  };

  const breadCrumbRoutes = [homePath, ...pathNames];
  const breadCrumbLastItem = breadCrumbRoutes[breadCrumbRoutes?.length - 1];

  const route = useRouter();

  return (
    <Breadcrumb
      separator={
        <Icon as={IoIosArrowForward} color="primary" fontSize={"sm"} />
      }
    >
      {breadCrumbRoutes?.map((breadCrumbPath) => (
        <BreadcrumbItem key={breadCrumbPath?.route}>
          <BreadcrumbLink
            fontSize="sm"
            fontWeight={
              breadCrumbLastItem?.route === breadCrumbPath?.route
                ? "bold"
                : "regular"
            }
            onClick={() => route.push(`/${breadCrumbPath?.route}`)}
          >
            {breadCrumbPath?.displayName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadCrumb;
