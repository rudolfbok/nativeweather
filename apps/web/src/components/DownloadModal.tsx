import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Text } from "./Text";

const DMG_URL = "/downloads/NativeWeather_0.9.0_aarch64.dmg";
const COMMAND = "xattr -cr /Applications/NativeWeather.app";

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
}

export const DownloadModal = ({ open, onClose }: DownloadModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl bg-white p-6 text-black backdrop:bg-black/50 dark:bg-[#1c1c1e] dark:text-white"
    >
      <div className="flex flex-col gap-4">
        <Text as="h2" className="text-xl font-semibold">
          v0.9
        </Text>
        <Text as="p" className="text-left text-sm text-zinc-600 dark:text-zinc-300">
          NativeWeather for macOS (Apple Silicon) isn&apos;t notarized yet.
          Open the .dmg, drag NativeWeather to Applications, then run this
          command in Terminal once before launching it. Alternatively,
          right-click the app and choose Open.
        </Text>
        <div className="flex items-center justify-between gap-2 rounded-xl bg-zinc-100 p-3 dark:bg-black/40">
          <code className="overflow-x-auto whitespace-nowrap text-xs">
            {COMMAND}
          </code>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy command"
            className="shrink-0 cursor-pointer rounded-lg p-1.5 hover:bg-black/10 dark:hover:bg-white/10"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-full bg-zinc-200 px-4 py-2 text-sm font-semibold dark:bg-zinc-700"
          >
            Close
          </button>
          <a
            href={DMG_URL}
            download
            onClick={onClose}
            className="flex-1 rounded-full bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
          >
            Download .dmg
          </a>
        </div>
      </div>
    </dialog>
  );
};
