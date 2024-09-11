import React from "react";
import TableRolesAndPermissions from "./tables/TableRolesAndPermissions";
import { roleList } from "@/resources/roleList";

const RoleAndPermissions = () => {
  return (
    <>
      <TableRolesAndPermissions roleList={roleList} />
    </>
  );
};

export default RoleAndPermissions;
