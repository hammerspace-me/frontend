import { ethers } from "ethers";
import { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useApi } from "../actions/api-factory";
import { useStore } from "../store";

const LoginButton: FC = () => {
  const [loading, setLoading] = useState(false); // Loading button state
  const [store, setStore] = useStore();
  const { api } = useApi();
  let navigate = useNavigate();

  const alreadyLoggedIn = store.accessToken != undefined;

  const handleLoginWithMetamask = async () => {
    const _window = window as any;
    if (!_window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    setLoading(true);
    await _window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(_window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const nonce = await api.post("auth/request", {
      backpack: address,
    });

    const signature = await signer.signMessage(nonce.nonce);

    setStore((old) => ({
      ...old,
      api: { ...old.api, writing: true },
    }));

    const login = await api.post("auth/login", {
      address: address,
      signature: signature,
    });

    const cookies = new Cookies();
    cookies.set("access_token", login.accessToken);
    cookies.set("user_address", address);

    setStore((old) => ({
      ...old,
      accessToken: login.accessToken,
      userAddress: address,
    }));

    setLoading(false);
    navigate("/admin/backpack", { replace: true });
  };

  if (alreadyLoggedIn) {
    return <span>Logged in as {store.userAddress}</span>;
  }

  return (
    <Button variant="secondary" onClick={handleLoginWithMetamask}>
      Login with Metamask
    </Button>
  );
};

export default LoginButton;
