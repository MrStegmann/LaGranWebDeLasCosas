import { Routes, Route, BrowserRouter } from "react-router-dom";
import Mainmenu from "./page/Mainmenu";
import { SheetProvider } from "./context/SheetContext";
import { PerkProvider } from "./context/PerksContext";
import PerksManager from "./page/PerksManager";
import Settings from "./page/Settings";
import { AlertProvider } from "./context/AlertContext";
import { SSProvider } from "./context/SaSContext";
import { ItemProvider } from "./context/ItemsContext";
import ItemsManager from "./page/ItemsManager";
import SheetsMenu from "./page/SheetsMenu";
import SaSMenu from "./page/SaSMenu";
import Grimoire from "./page/Grimoire";
import OECMenu from "./page/OECMenu";
import OneShotsManager from "./page/OneShots";
import SheetsManager from "./page/SheetsManager";
import { OECProvider } from "./context/OECContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./page/Login";
import ProfileLayout from "./layouts/ProfileLayout";
import Codex from "./page/Codex";
import CharManager from "./managers/CharManager";
import MagicBackground from "./components/MagicBackground";

function App() {
  return (
    <BrowserRouter>
      <MagicBackground>
        <AlertProvider>
          <AuthProvider>
            <SSProvider>
              <ItemProvider>
                <PerkProvider>
                  <SheetProvider>
                    <OECProvider>
                      <Routes>
                        <Route path="/" element={<Login />} />

                        <Route path="/:username/" element={<ProfileLayout />}>
                          <Route index element={<Mainmenu />} />

                          <Route path="codex/" element={<Codex />}></Route>

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

                          <Route path="item-maker" element={<ItemsManager />} />
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
                    </OECProvider>
                  </SheetProvider>
                </PerkProvider>
              </ItemProvider>
            </SSProvider>
          </AuthProvider>
        </AlertProvider>
      </MagicBackground>
    </BrowserRouter>
  );
}

export default App;
