import { Tab } from "@headlessui/react";
import { table } from "console";
import React from "react";

function TableRoot(
    {children,
    ...props}
    : React.HTMLAttributes<HTMLTableElement>){
    return (
        <table className="w-full text-sm text-left " {...props}>
            {children}
        </table>
    )
}

function TableRow(
    {children,className,
    ...props}
    : React.HTMLAttributes<HTMLTableRowElement>){
        return (
            <tr className={`p-4 border-b-1 border-gray-300 ${className ?? ''}`} {...props}>{children}</tr>
        )
    }


function TableHead({className,children,...props}:React.HTMLAttributes<HTMLTableCellElement>){
    return(
        <th className={`py-4 text-gray-400 font-poppins font-light text-sm ${className ?? ''}`} {...props}>{children}</th>
    )
}

function TableHeader({
    className, children,...props}:React.HTMLAttributes<HTMLTableSectionElement>){
    return(
        <thead className={className}{...props}>{children}</thead>
    )
}

function TableBody({
    className, children, ...props}:React.HTMLAttributes<HTMLTableSectionElement>){
        return (
            <tbody className={className} {...props}>{children}</tbody>
        )
    }

function TableCell({
    className, children, ...props}:React.HTMLAttributes<HTMLTableCellElement>){
        return (
            <td className={className} {...props}>{children}</td>
        )
    }

export {TableRoot, TableBody, TableHead, TableRow, TableCell, TableHeader}