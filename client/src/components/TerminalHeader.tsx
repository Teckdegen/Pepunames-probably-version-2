
import { CircleX, Minus, Square } from "lucide-react";

export function TerminalHeader({ title = "PNS Terminal" }: { title?: string }) {
  return (
    <div className="terminal-header">
      <div className="flex items-center space-x-2">
        <CircleX className="h-3 w-3 text-red-500" />
        <Minus className="h-3 w-3 text-yellow-500" />
        <Square className="h-3 w-3 text-green-500" />
      </div>
      <div className="text-white/90 text-xs font-mono font-medium">
        {title}
      </div>
      <div className="w-12"></div> {/* Spacer for balance */}
    </div>
  );
}
