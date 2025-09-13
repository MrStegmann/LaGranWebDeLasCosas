import { Routes, Route, BrowserRouter } from "react-router-dom";
import Mainmenu from "@/page/Mainmenu";
import { SheetProvider } from "@/context/SheetContext";
import { AlertProvider } from "@/context/AlertContext";
import { SSProvider } from "@/context/SaSContext";
import { ItemProvider } from "@/context/ItemsContext";
import { AuthProvider } from "@/context/AuthContext";
import Login from "@/page/Login";
import ProfileLayout from "@/layouts/ProfileLayout";
import MagicBackground from "@/components/MagicBackground";
import AdminLayout from "@/layouts/AdminLayout";
import Users from "@/page/Users";

import Codex from "@/page/Codex";
import NewUser from "./page/NewUser";
import UsersList from "./page/UsersList";

function App() {
  return (
    <BrowserRouter>
      <MagicBackground>
        <AlertProvider>
          <AuthProvider>
            <SSProvider>
              <ItemProvider>
                <SheetProvider>
                  <Routes>
                    <Route path="/" element={<Login />} />

                    <Route path="/:username/" element={<ProfileLayout />}>
                      <Route index element={<Mainmenu />} />

                      <Route path="codex/" element={<Codex />}></Route>
                      {/*
                      <Route path="grimoire/" element={<SaSMenu />}></Route>

                      <Route path="sheets/" element={<SheetsManager />}>
                        <Route
                          path="characters-menu"
                          element={<CharManager />}
                        />
                        <Route
                          path="npcs-menu"
                          element={<SheetsManager sheetOption={"npcs"} />}
                        />
                      </Route>

                      <Route path="item-maker" element={<ItemsManager />} /> */}
                    </Route>
                    <Route path="/admin/" element={<AdminLayout />}>
                      <Route path="new-user" element={<NewUser />} />
                      <Route path="users-list" element={<UsersList />} />
                    </Route>
                    {/* <Route path="/" element={<Mainmenu />} /> */}
                    {/* <Route path="/sheets" element={<SheetsMenu />} />
                      <Route path="/grimoire" element={<SaSMenu />} />
                      <Route
                        path="/sheets/:option"
                        element={<SheetsManager />}
                      />
                      <Route path="/grimoire/:option" element={<Grimoire />} />
                      <Route path="/perk-maker" element={<PerksManager />} />
                      <Route path="/item-maker" element={<ItemsManager />} />
                      <Route path="/oec-menu" element={<OECMenu />} />
                      <Route path="/oneshots" element={<OneShotsManager />} />
                       */}
                  </Routes>
                </SheetProvider>
              </ItemProvider>
            </SSProvider>
          </AuthProvider>
        </AlertProvider>
      </MagicBackground>
    </BrowserRouter>
  );
}

export default App;
