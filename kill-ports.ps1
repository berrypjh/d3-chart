$ports = @(4000, 4001)

foreach ($port in $ports) {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connections) {
        foreach ($conn in $connections) {
            $pid = $conn.OwningProcess
            try {
                Stop-Process -Id $pid -Force -ErrorAction Stop
                Write-Host "Terminated process on port $port (PID: $pid)"
            } catch {
                Write-Host "Failed to terminate process on port $port (PID: $pid): $_"
            }
        }
    } else {
        Write-Host "No process found on port $port"
    }
}


