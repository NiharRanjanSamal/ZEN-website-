import { execSync } from "node:child_process";

const port = process.argv[2] ?? "3000";

if (process.platform === "win32") {
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
    const pids = new Set();
    for (const line of out.split(/\r?\n/)) {
      if (!line.includes("LISTENING")) continue;
      const pid = line.trim().split(/\s+/).at(-1);
      if (pid && pid !== "0") pids.add(pid);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        process.stdout.write(`Freed port ${port} (PID ${pid})\n`);
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* nothing listening */
  }
} else {
  try {
    execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: "ignore", shell: true });
  } catch {
    /* ignore */
  }
}
