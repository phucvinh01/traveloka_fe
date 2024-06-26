"use client";;
import { Row } from "@tanstack/react-table"
import { ModalDetailBooking } from "./modal-view-detail";
import AlertCheckIn from "./alert-checkin";



interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {


  return (
    <div className="flex space-x-2">
      <ModalDetailBooking data={row.original} className="detail"/> 

    </div>
  )
}