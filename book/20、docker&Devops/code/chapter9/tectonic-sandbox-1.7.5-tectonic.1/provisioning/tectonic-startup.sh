#!/bin/bash
set -e

KUBECTL_URL=https://storage.googleapis.com/kubernetes-release/release/v1.7.0/bin/linux/amd64/kubectl

trap "{ rm -f /tmp/cat.txt; }" EXIT

systemctl start --no-block tectonic

echo "Downloading kubectl"
curl -sLO $KUBECTL_URL
chmod +x kubectl

echo "Tectonic is starting. As a progress check, the list of running pods"
echo " will be periodically printed."
echo
echo "NOTE: this may take 20 minutes or more depending on Internet throughput."
echo "~1GB of data will be downloaded."

sleep 2

# Wait for tectonic.service to complete
while ! systemctl is-active tectonic &> /dev/null; do
    if /home/core/kubectl --kubeconfig=/etc/kubernetes/kubeconfig get pods --all-namespaces &> /tmp/cat.txt; then
        cat /tmp/cat.txt
        echo " "
    fi
    echo "Tectonic is still starting, sleeping 30 seconds"
    sleep 30s
done

/home/core/kubectl --kubeconfig=/etc/kubernetes/kubeconfig get pods --all-namespaces > /tmp/cat.txt
cat /tmp/cat.txt

cat << EOF
Tectonic has started successfully! You can log into your cluster now:
  Console address: https://console.tectonicsandbox.com/
  Username "admin@example.com"
  Password "sandbox"

Unable to reach the Console? Starting the VM after a reboot? Don't panic!
  Please wait 5+ minutes for the Console to start after a VM reboot.

Follow the instructions to install kubectl for your platform:
https://coreos.com/kubernetes/docs/latest/configure-kubectl.html

To use kubectl on Mac or Linux, set the KUBECONFIG environment variable from the project root like this:
  export KUBECONFIG=\$PWD/provisioning/etc/kubernetes/kubeconfig

To use kubectl in Windows Powershell, set the KUBECONFIG environment variable from the project root like this:
  \$env:KUBECONFIG = "\$PWD\\provisioning\\etc\\kubernetes\\kubeconfig"
EOF
