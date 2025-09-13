import React, { useEffect, useState } from "react";
import RuneFrame from "@/framework/RuneFrame";
import UserBridge from "@/bridges/UserBridge";
import useAlert from "@/context/AlertContext";
import { useMagicBgStore } from "@/store/MagicBGStore";
import UserForm from "@/components/forms/UserForm";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";
import UserInfo from "@/components/infos/UserInfo";
import DeleteBtnGAC from "@/framework/DeleteBtnGAC";
import ButtonGAC from "@/framework/ButtonGAC";
import PageGAC from "@/framework/PageGAC";

const UsersList = () => {
  const { setAlert } = useAlert();
  const setSpherePos = useMagicBgStore((state) => state.setSpherePos);
  const setSphereRot = useMagicBgStore((state) => state.setSphereRot);
  const auth = useAuthStore((state) => state.auth);
  const [showContent, setShowContent] = useState(false);

  const [vanishContent, setVanishContent] = useState(false);
  const [createView, setCreateView] = useState(false);
  const [editView, setEditView] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [overUser, setOverUser] = useState(null);
  const [delUser, setDelUser] = useState(false);
  const [delTimer, setDelTimer] = useState(8);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (delUser) {
      if (delTimer > 0) {
        setTimeout(() => {
          setDelTimer((before) => (before - 1 > 0 ? before - 1 : 0));
        }, 1000);
      } else {
        setDelUser(false);
        setDelTimer(8);
        setAlert({
          msg: "Supongo que has cambiado de opinión. ¡Mejor! Los datos hay que preservarlos.",
          type: "info",
          destroy: true,
        });
      }
    } else {
      setDelTimer(8);
    }
  }, [delUser, delTimer]);

  useEffect(() => {
    setSpherePos([12, 3, -25]);
    setSphereRot([0.1, 0, 0.25]);
    setAlert({
      msg: "",
    });
  }, []);

  const switchViewMode = (mode) => {
    switch (mode) {
      case "edit":
        setEditView(true);
        setCreateView(false);
        break;
      case "create":
        setEditView(false);
        setCreateView(true);
        setUserData(null);
        setSelected(null);
        break;

      default:
        setEditView(false);
        setCreateView(false);
        break;
    }
  };

  const getUsers = async () => {
    try {
      const response = await UserBridge.get();
      setUsersList(response.data);
    } catch (error) {
      setAlert({
        type: "error",
        destroy: true,
        msg: error.message,
      });
    }
  };

  const selectUser = (user) => {
    setSelected(user._id);
    setUserData(user);
    switchViewMode("");
  };

  const onUpdate = async (user) => {
    try {
      const result = await UserBridge.update(user);
      setAlert({
        msg: `Bien, bien...  si me das un segundo... vale. ¡Perfecto! ${result.data.username} se ha actualizado correctamente`,
        destroy: true,
      });
      const response = await UserBridge.get();
      setUsersList(response.data);
      selectUser(result.data);
    } catch (error) {
      setAlert({
        type: "error",
        destroy: true,
        msg: error.message,
      });
    }
  };

  const onCreate = async (user) => {
    try {
      const { _id, ...rest } = user;
      const result = await UserBridge.create(rest);
      setAlert({
        msg: `Bien, bien...  si me das un segundo... vale. ¡Perfecto! ${result.data.username} he guardado bien el usuario`,
        destroy: true,
      });
      setUsersList((before) => [...before, result.data]);
      selectUser(result.data);
    } catch (error) {
      setAlert({
        type: "error",
        destroy: true,
        msg: error.message,
      });
    }
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    if (!delUser) {
      setAlert({
        msg: "¿Estás seguro de que quieres eliminar a este usuario? ¿Para siempre? Si es así... vuelve a pulsar sobre Eliminar",
        type: "warning",
      });
      setDelUser(true);
    } else {
      try {
        const result = await UserBridge.delete(selected);
        setAlert({
          msg: `Bueno, pues ya estaría... ${result.data.username} eliminado de la existencia... Para siempre. Sip, para siempre.`,
          destroy: true,
        });
        setUsersList((before) => [
          ...before.filter((be) => be._id !== result.data._id),
        ]);
        setDelUser(false);
        setUserData(null);
        setSelected(null);
      } catch (error) {
        console.log(error);
        setAlert({
          type: "error",
          destroy: true,
          msg: error.message,
        });
      }
    }
  };

  const navigateTo = (path) => {
    setShowContent(false);
    setVanishContent(true);
    setTimeout(() => {
      navigate(path);
    }, 1100);
  };
  return (
    <PageGAC
      vanishContent={vanishContent}
      navigate={() => navigateTo(`/${auth.username}`)}
    >
      <RuneFrame
        sides="x"
        setShowContent={setShowContent}
        showContent={showContent}
      >
        <div className="my-2">
          <ButtonGAC onClick={() => switchViewMode("create")}>
            Crear Usuario
          </ButtonGAC>
        </div>
        <div className="w-full h-full flex flex-row justify-between">
          <div className="w-1/4 h-full max-h-full overflow-y-auto space-y-2">
            {usersList.map((user) => (
              <button
                key={user._id}
                onMouseOver={() => setOverUser(user._id)}
                onMouseLeave={() => setOverUser(null)}
                onClick={() => selectUser(user)}
                className={`w-full relative cursor-pointer px-2 py-1 text-mana ${selected === user._id && "animate-pulseTextGlow"}`}
              >
                <span
                  className={`w-4 h-4 top-0 right-0 absolute border-r-2 border-t-2 transition-all duration-1000 z-10  ${overUser === user._id || selected === user._id ? "w-full h-full" : ""}`}
                ></span>
                <span
                  className={`w-4 h-4 bottom-0 left-0 absolute border-l-2 border-b-2 transition-all duration-1000 z-10 ${overUser === user._id || selected === user._id ? "w-full h-full" : ""}`}
                ></span>
                {user.username}
              </button>
            ))}
          </div>
          <div className="w-1/2">
            {userData && (
              <>
                {!editView ? (
                  <>
                    <UserInfo data={userData} />
                    <div className="w-full flex flex-row justify-between">
                      <ButtonGAC onClick={() => switchViewMode("edit")}>
                        Editar
                      </ButtonGAC>

                      <DeleteBtnGAC onClick={deleteUser}>
                        Eliminar {delUser ? delTimer : ""}
                      </DeleteBtnGAC>
                    </div>
                  </>
                ) : (
                  <UserForm
                    data={userData}
                    onSubmit={onUpdate}
                    onCancel={(e) => {
                      e.preventDefault();
                      switchViewMode("");
                    }}
                  />
                )}
              </>
            )}
            {createView && (
              <UserForm
                onSubmit={onCreate}
                onCancel={(e) => {
                  e.preventDefault();
                  switchViewMode("");
                }}
              />
            )}
          </div>
        </div>
      </RuneFrame>
    </PageGAC>
  );
};

export default UsersList;
