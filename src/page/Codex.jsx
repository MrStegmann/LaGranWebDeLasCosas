import { useState, useEffect } from "react";
import PageGAC from "@/framework/PageGAC";
import { useParams, useNavigate } from "react-router-dom";
import CodexEnum from "@/../utils/enums/CodexEnum";
import MinimalGlowingBtn from "@/framework/MinimalGlowingBtn";
import useAlert from "@/context/AlertContext";
import { usePageStore } from "@/store/PageStore";
import { useMagicBgStore } from "@/store/MagicBGStore";
import CodexFragmentForm from "@/components/forms/CodexFragmentForm";
import RolesEnum from "@/../utils/enums/RolesEnum";
import CodexCategory from "@/components/forms/CodexCategory";
import CodexBridge from "@/bridges/CodexBridge";
import CodexCategoryList from "@/components/lists/CodexCategoryList";
import CodexFragmentsList from "../components/lists/CodexFragmentsList";

const Codex = () => {
  const { setAlert } = useAlert();
  const { username } = useParams();
  const setToAppear = usePageStore((state) => state.setToAppear);
  const setSphereToCodex = useMagicBgStore((state) => state.setSphereToCodex);
  const [overSomething, setOverSomething] = useState("");

  const [categories, setCategories] = useState([]);
  const [fragments, setFragments] = useState([]);

  const [option, setOption] = useState("");
  const [action, setAction] = useState("");
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setSphereToCodex();

    getCategories();
    getFragments();
  }, []);

  useEffect(() => {
    if (overSomething) {
      if (overSomething === CodexEnum.BACK) {
        setAlert({ msg: "¿Ya has visto todo lo que necesitabas ver?" });
      }
    } else {
      setAlert({ msg: "" });
    }
  }, [overSomething]);

  useEffect(() => {
    if (categories.length === 0) setAction("");
  }, [categories]);

  const getCategories = async () => {
    try {
      const result = await CodexBridge.getCategories();
      setCategories(result.data);
    } catch (error) {
      setAlert({ type: "error", msg: error.message, destroy: true });
    }
  };

  const getFragments = async () => {
    try {
      const result = await CodexBridge.getFragments();
      setFragments(result.data);
    } catch (error) {
      setAlert({ type: "error", msg: error.message, destroy: true });
    }
  };

  const navigateTo = (path) => {
    setToAppear(false);
    setTimeout(() => {
      navigate(path);
    }, 800);
  };

  const createubmenu = (menu, menuItems) => {
    if (menu === CodexEnum.CODEX_CATEGORY) {
      if (categories.length > 0) {
        menuItems.push({
          fnc: () => setAction(CodexEnum.CODEX_CATEGORY_READ),
          label: "Ver categorías",
          minRol: RolesEnum.OFFICER,
          id: CodexEnum.CODEX_CATEGORY_READ,
        });
      }

      menuItems.push({
        fnc: () => setAction(CodexEnum.CODEX_CREATE_CATEGORY),
        label: "Crear categoría",
        minRol: RolesEnum.OFFICER,
        id: CodexEnum.CODEX_CREATE_CATEGORY,
      });
    }
    if (menu === CodexEnum.CODEX_FRAGMENT) {
      if (fragments.length > 0) {
        menuItems.push({
          fnc: () => setAction(CodexEnum.CODEX_FRAGMENT_READ),
          label: "Ver fragmentos",
          minRol: RolesEnum.GUEST,
          id: CodexEnum.CODEX_FRAGMENT_READ,
        });
      }

      menuItems.push({
        fnc: () => setAction(CodexEnum.CODEX_CREATE_FRAGMENT),
        label: "Crear fragmento",
        minRol: RolesEnum.OFFICER,
        id: CodexEnum.CODEX_CREATE_FRAGMENT,
      });
    }

    menuItems.push({
      fnc: () => setOption(""),
      label: "Volver",
      minRol: RolesEnum.GUEST,
      id: CodexEnum.BACK,
    });

    return menuItems;
  };

  const items = (p) => {
    const menuItems = [];
    switch (p) {
      case CodexEnum.CODEX_READ:
        return createubmenu(CodexEnum.CODEX_READ, menuItems);
      case CodexEnum.CODEX_CATEGORY:
        return createubmenu(CodexEnum.CODEX_CATEGORY, menuItems);
      case CodexEnum.CODEX_FRAGMENT:
        return createubmenu(CodexEnum.CODEX_FRAGMENT, menuItems);
      default:
        return [
          {
            fnc: () => setOption(CodexEnum.CODEX_READ),
            label: "Leer Codex",
            minRol: RolesEnum.GUEST,
            id: CodexEnum.CODEX_READ,
          },
          {
            fnc: () => setOption(CodexEnum.CODEX_CATEGORY),
            label: "Categorias",
            minRol: RolesEnum.OFFICER,
            id: CodexEnum.CODEX_CATEGORY,
          },
          {
            fnc: () => setOption(CodexEnum.CODEX_FRAGMENT),
            label: "Fragmentos",
            minRol: RolesEnum.OFFICER,
            id: CodexEnum.CODEX_FRAGMENT,
          },
          {
            fnc: () => navigateTo(`/${username}/`),
            label: "Volver",
            minRol: RolesEnum.GUEST,
            id: CodexEnum.BACK,
          },
        ];
    }
  };

  const handleCreateCategory = async (name) => {
    try {
      const result = await CodexBridge.createCategory(name);
      setAlert({
        msg: `¡Bien! ¡La nueva categoría ${result.data.name} se ha creado! Espera... no... ¿qué ha- ¡Oh, sí! ¡Se ha creado!`,
        type: "info",
        destroy: true,
      });
      await getCategories();
    } catch (error) {
      setAlert({ type: "error", msg: error.message, destroy: true });
    }
  };

  const handleUpdateCategory = async (cat) => {
    try {
      const result = await CodexBridge.updateCategory(cat);
      setAlert({
        msg: `¡Bien! ¡La categoría ${result.data.name} se ha actualizado! Espero que no haya problemas con encontrarlo en el futuro...`,
        type: "info",
        destroy: true,
      });
      await getCategories();
    } catch (error) {
      setAlert({ type: "error", msg: error.message, destroy: true });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const result = await CodexBridge.deleteCategory(id);
      setAlert({
        msg: `Estupendo... Bueno, ya estaría. La categoría ${result.data.name} ya no existe... Seguro que esto provocará un problema a futuro...`,
        destroy: true,
      });
      await getCategories();
    } catch (error) {
      setAlert({ type: "error", msg: error.message, destroy: true });
    }
  };

  const handleCreateFragment = async (fragment) => {
    try {
      const result = await CodexBridge.createFragment(fragment);
      setAlert({
        msg: `¡Yei! ¡Nueva información en el Gran Libro de las Cosas! Esto siempre hay que celebrarlo. Ya tengo ganas de leer ${result.data.title}`,
        type: "info",
        destroy: true,
      });
      await getFragments();
    } catch (error) {
      setAlert({ type: "error", msg: error.message, destroy: true });
    }
  };

  const handleDeleteFragment = async (id) => {
    console.log(id);
  };

  const handleUpdateFragment = async (fragment) => {
    console.log(fragment);
  };

  return (
    <PageGAC>
      <div className="w-full h-full flex flex-row relative items-center">
        <div className="h-[75dvh] w-full flex absolute right-0 translate-x-1/3">
          {option === CodexEnum.CODEX_CATEGORY && (
            <>
              {action === CodexEnum.CODEX_CREATE_CATEGORY && (
                <CodexCategory handleSubmit={handleCreateCategory} />
              )}
              {action === CodexEnum.CODEX_CATEGORY_READ && (
                <CodexCategoryList
                  categories={categories}
                  handleDelete={handleDeleteCategory}
                  handleUpdate={handleUpdateCategory}
                />
              )}
            </>
          )}
          {option === CodexEnum.CODEX_FRAGMENT && (
            <>
              {action === CodexEnum.CODEX_CREATE_FRAGMENT && (
                <div className="w-2/6">
                  <CodexFragmentForm
                    fragment={null}
                    categories={categories}
                    handleSubmit={handleCreateFragment}
                  />
                </div>
              )}
              {action === CodexEnum.CODEX_FRAGMENT_READ && (
                <div className="w-full h-full">
                  <CodexFragmentsList
                    fragments={fragments}
                    categories={categories}
                    handleDelete={handleDeleteFragment}
                    handleUpdate={handleUpdateFragment}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageGAC>
  );
};

export default Codex;
