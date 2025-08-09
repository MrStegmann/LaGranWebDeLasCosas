import { Routes, Route, HashRouter } from 'react-router-dom';
import Mainmenu from './page/Mainmenu';
import { SheetProvider } from './context/SheetContext';
import { PerkProvider } from './context/PerksContext';
import PerksManager from './page/PerksManager';
import Settings from './page/Settings';
import { AlertProvider } from './context/AlertContext';
import { SSProvider } from './context/SaSContext';
import { ItemProvider } from './context/ItemsContext';
import ItemsManager from './page/ItemsManager';
import SheetsMenu from './page/SheetsMenu';
import SaSMenu from './page/SaSMenu';
import Grimoire from './page/Grimoire';
import OECMenu from './page/OECMenu';
import OneShotsManager from './page/OneShots';
import SheetsManager from './page/SheetsManager';
import { OECProvider } from './context/OECContext';
import { AuthProvider } from './context/AuthContext';

function App() {
	return (
		<HashRouter>
			<AlertProvider>
				<AuthProvider>
					<SSProvider>
						<ItemProvider>
							<PerkProvider>
								<SheetProvider>
									<OECProvider>
										<Routes>
											<Route path="/" element={<Mainmenu />} />
											<Route path="/sheets" element={<SheetsMenu />} />
											<Route path="/grimoire" element={<SaSMenu />} />
											<Route path="/sheets/:option" element={<SheetsManager />} />
											<Route path="/grimoire/:option" element={<Grimoire />} />
											<Route path="/perk-maker" element={<PerksManager />} />
											<Route path="/item-maker" element={<ItemsManager />} />
											<Route path="/oec-menu" element={<OECMenu />} />
											<Route path="/oneshots" element={<OneShotsManager />} />
											<Route path="/settings" element={<Settings />} />
										</Routes>
									</OECProvider>
								</SheetProvider>
							</PerkProvider>
						</ItemProvider>
					</SSProvider>
				</AuthProvider>
			</AlertProvider>
		</HashRouter>
	);
}

export default App;
