param([string]$Mode = 'hide', [string]$ProcessName = 'wgc')

$ErrorActionPreference = 'SilentlyContinue'

Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using System.Collections.Generic;

public class WinEnum {
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

    [DllImport("user32.dll")]
    public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);

    [DllImport("user32.dll")]
    public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);

    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

    [DllImport("user32.dll")]
    public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);

    public static List<IntPtr> FindWindows(uint targetPid) {
        List<IntPtr> found = new List<IntPtr>();
        EnumWindows((hWnd, lParam) => {
            uint pid;
            GetWindowThreadProcessId(hWnd, out pid);
            if (pid == targetPid) {
                found.Add(hWnd);
            }
            return true;
        }, IntPtr.Zero);
        return found;
    }
}
"@

for ($i = 0; $i -lt 300; $i++) {
    $proc = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($proc) {
        $wins = [WinEnum]::FindWindows([uint32]$proc.Id)
        foreach ($w in $wins) {
            if ($Mode -eq 'show') {
                [WinEnum]::SetWindowPos($w, [IntPtr]::Zero, 80, 80, 0, 0, 0x0045) | Out-Null
                [WinEnum]::ShowWindow($w, 5) | Out-Null
            } else {
                [WinEnum]::ShowWindow($w, 0) | Out-Null
                [WinEnum]::SetWindowPos($w, [IntPtr]::Zero, -32000, -32000, 0, 0, 0x0015) | Out-Null
            }
        }
    }
    Start-Sleep -Milliseconds 300
}
