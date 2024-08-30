"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { StatsData } from "@/types/repo-stats";

type SortColumn = "nFiles" | "code";
type SortDirection = "asc" | "desc";

interface LanguageDetailsTableProps {
  statsData: StatsData;
}

export function LanguageDetailsTable({ statsData }: LanguageDetailsTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>("code");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const languages = Object.keys(statsData).filter(
    (key) => key !== "header" && key !== "SUM"
  );
  const totalCode = statsData.SUM.code;

  const getLanguagePercentage = (language: string) => {
    return ((statsData[language].code / totalCode) * 100).toFixed(1);
  };

  const getColorForLanguage = (index: number) => {
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#FF6384",
      "#C9CBCF",
    ];
    return colors[index % colors.length];
  };

  const sortedLanguages = [...languages].sort((a, b) => {
    const aValue = statsData[a][sortColumn];
    const bValue = statsData[b][sortColumn];
    return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
  });

  const toggleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Language</TableHead>
          <TableHead className="text-right">Percentage</TableHead>
          <TableHead className="text-right">
            <Button variant="ghost" onClick={() => toggleSort("nFiles")}>
              Files
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">
            <Button variant="ghost" onClick={() => toggleSort("code")}>
              Lines of Code
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedLanguages.map((lang, index) => (
          <TableRow key={lang}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor: getColorForLanguage(index),
                  }}
                />
                {lang}
              </div>
            </TableCell>
            <TableCell className="text-right">
              {getLanguagePercentage(lang)}%
            </TableCell>
            <TableCell className="text-right">
              {statsData[lang].nFiles}
            </TableCell>
            <TableCell className="text-right">{statsData[lang].code}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
