import { useState, useCallback, useEffect } from 'react';
import { Header } from "@components/Header";
import { Navigation } from "@components/Navigation";
import { Background } from "@components/Background";
import { ServerStats } from "@components/ServerStats";
import { PlayersList } from "@components/PlayersList";
import { RulesPanel } from "@components/RulesPanel";
import { EconomyPanel } from "@components/EconomyPanel";
import { SettingsPanel } from "@components/SettingsPanel";
import { DemoControls } from "@components/DemoControls";
import { DevInfo } from "@components/DevInfo";
import { useVisibility } from '@utilities/visibilityProvider';
import { useNuiEvent } from '@utilities/utils';
import { isEnvBrowser } from '@utilities/misc';
import './App.css';

interface ServerData {
  ServerName: string;
  MaxPlayers: number;
  StartingMoney: number;
  isPvpEnabled: boolean;
  onlineCount?: number;
  uptime?: string;
  ping?: number;
  location?: string;
}

const App = () => {
	const { visible } = useVisibility();
	const [activeTab, setActiveTab] = useState('home');
	const [serverData, setServerData] = useState<ServerData>({
		ServerName: isEnvBrowser() ? "Professional FiveM Server" : "Loading...",
		MaxPlayers: isEnvBrowser() ? 64 : 32,
		StartingMoney: isEnvBrowser() ? 10000 : 5000,
		isPvpEnabled: isEnvBrowser() ? true : false,
		onlineCount: isEnvBrowser() ? 42 : 0,
		uptime: isEnvBrowser() ? "2d 14h 32m" : "0m",
		ping: isEnvBrowser() ? 35 : 0,
		location: isEnvBrowser() ? "US West" : "Unknown"
	});

	// Handle NUI events
	useNuiEvent('configData', (data: ServerData) => {
		console.log('Received server data:', data);
		setServerData({
			ServerName: data.ServerName || "FiveM Server",
			MaxPlayers: data.MaxPlayers || 32,
			StartingMoney: data.StartingMoney || 5000,
			isPvpEnabled: data.isPvpEnabled || false,
			onlineCount: data.onlineCount || Math.floor(Math.random() * data.MaxPlayers),
			uptime: data.uptime || "Unknown",
			ping: data.ping || Math.floor(Math.random() * 100) + 20,
			location: data.location || "Unknown"
		});
	});

	// Handle demo data updates
	const handleDemoDataUpdate = useCallback((data: any) => {
		console.log('Demo data update:', data);
		const enrichedData = {
			...data,
			onlineCount: Math.floor(Math.random() * data.MaxPlayers),
			uptime: `${Math.floor(Math.random() * 48)}h ${Math.floor(Math.random() * 60)}m`,
			ping: Math.floor(Math.random() * 60) + 15,
			location: ['US East', 'US West', 'EU Central', 'Asia Pacific'][Math.floor(Math.random() * 4)]
		};
		
		// Simulate NUI message
		window.dispatchEvent(new MessageEvent('message', {
			data: {
				type: 'configData',
				...enrichedData
			}
		}));
	}, []);

	// Economy data
	const economyData = {
		startingMoney: serverData.StartingMoney,
		bankRate: 2.5,
		jobMultiplier: 1.2,
		taxRate: 15
	};

	// Render tab content
	const renderTabContent = () => {
		switch (activeTab) {
			case 'home':
				return (
					<div className="simple-home">
						<div className="welcome-section">
							<h1>Welcome to {serverData.ServerName}</h1>
							<p>Your premier FiveM roleplay experience</p>
						</div>
						
						<div className="quick-stats">
							<div className="stat-card">
								<div className="stat-icon">👥</div>
								<div className="stat-info">
									<h3>{serverData.onlineCount}/{serverData.MaxPlayers}</h3>
									<p>Players Online</p>
								</div>
							</div>
							
							<div className="stat-card">
								<div className="stat-icon">💰</div>
								<div className="stat-info">
									<h3>${serverData.StartingMoney.toLocaleString()}</h3>
									<p>Starting Money</p>
								</div>
							</div>
							
							<div className="stat-card">
								<div className="stat-icon">🌍</div>
								<div className="stat-info">
									<h3>{serverData.location}</h3>
									<p>Server Location</p>
								</div>
							</div>
						</div>
						
						<div className="server-features">
							<h2>Server Features</h2>
							<div className="features-grid">
								<div className="feature-item">
									<span className="feature-icon">🎮</span>
									<span>Active Roleplay</span>
								</div>
								<div className="feature-item">
									<span className="feature-icon">👮</span>
									<span>Police & EMS Jobs</span>
								</div>
								<div className="feature-item">
									<span className="feature-icon">🏪</span>
									<span>Business Ownership</span>
								</div>
								<div className="feature-item">
									<span className="feature-icon">🚗</span>
									<span>Custom Vehicles</span>
								</div>
							</div>
						</div>
					</div>
				);
			case 'players':
				return <PlayersList maxPlayers={serverData.MaxPlayers} />;
			case 'info':
				return (
					<div className="server-info-simple">
						<div className="info-header">
							<h2>Server Information</h2>
						</div>
						
						<div className="info-sections">
							<div className="info-section">
								<h3>📋 Server Rules</h3>
								<ul>
									<li>No RDM (Random Death Match)</li>
									<li>No VDM (Vehicle Death Match)</li>
									<li>Stay in character at all times</li>
									<li>Respect all players and staff</li>
									<li>No exploiting or cheating</li>
								</ul>
							</div>
							
							<div className="info-section">
								<h3>💼 Available Jobs</h3>
								<ul>
									<li>Police Officer - $300/hour</li>
									<li>EMS Paramedic - $280/hour</li>
									<li>Mechanic - $250/hour</li>
									<li>Taxi Driver - $180/hour</li>
									<li>Delivery Driver - $150/hour</li>
								</ul>
							</div>
							
							<div className="info-section">
								<h3>⚙️ Server Stats</h3>
								<ul>
									<li>Uptime: {serverData.uptime}</li>
									<li>Ping: {serverData.ping}ms</li>
									<li>PvP: {serverData.isPvpEnabled ? 'Enabled' : 'Disabled'}</li>
									<li>Max Players: {serverData.MaxPlayers}</li>
								</ul>
							</div>
						</div>
					</div>
				);
			default:
				return (
					<div className="simple-home">
						<div className="welcome-section">
							<h1>Welcome to {serverData.ServerName}</h1>
							<p>Your premier FiveM roleplay experience</p>
						</div>
					</div>
				);
		}
	};

	if (!visible) return (
		<div className="app">
			<Background />
			{isEnvBrowser() && (
				<>
					<DemoControls onDataUpdate={handleDemoDataUpdate} />
					<DevInfo />
				</>
			)}
		</div>
	);

	return (
		<div className="app">
			<Background />
			
			<div className="dashboard">
				<Header 
					serverName={serverData.ServerName}
					onlineCount={serverData.onlineCount || 0}
					maxPlayers={serverData.MaxPlayers}
				/>
				
				<Navigation 
					activeTab={activeTab}
					onTabChange={setActiveTab}
				/>
				
				<main className="dashboard-content">
					{renderTabContent()}
				</main>
			</div>
			
			{isEnvBrowser() && (
				<>
					<DemoControls onDataUpdate={handleDemoDataUpdate} />
					<DevInfo />
				</>
			)}
		</div>
	);
};

export default App;
