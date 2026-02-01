"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { IS_CLOUD } from "../lib/const";
import packageJson from "../../package.json";

export function VersionCheck() {
  useEffect(() => {
    if (IS_CLOUD) return;
    if (sessionStorage.getItem("version-check-done")) return;

    sessionStorage.setItem("version-check-done", "1");

    fetch("https://app.rybbit.io/api/version")
      .then((res) => res.json())
      .then((data: { version: string }) => {
        const latest = data.version;
        const current = packageJson.version;

        console.log("latest", latest);
        console.log("current", current);
        if (latest && latest !== current && isNewer(latest, current)) {
          toast.info(`Rybbit v${latest} is available (you're on v${current})`, {
            duration: Infinity,
            action: {
              label: "Upgrade",
              onClick: () =>
                window.open(
                  "https://www.rybbit.io/docs/self-hosting",
                  "_blank"
                ),
            },
          });
        }
      })
      .catch(() => {
        // Silently ignore - user may be offline or app.rybbit.io unreachable
      });
  }, []);

  return null;
}

function isNewer(latest: string, current: string): boolean {
  const l = latest.split(".").map(Number);
  const c = current.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((l[i] ?? 0) > (c[i] ?? 0)) return true;
    if ((l[i] ?? 0) < (c[i] ?? 0)) return false;
  }
  return false;
}
