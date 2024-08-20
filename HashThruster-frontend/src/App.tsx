
import "./App.css";
import Header from "./components/Header";
import HeaderHome from "./components/HeaderHome";
import Home from "./pages/Home"
import Footer from "./components/Footer";
import {Routes, Route, Navigate, useLocation} from "react-router-dom"
import Trends from "./pages/Trends"
import Detail from "./pages/Detail";
import Launchpad from "./pages/Launchpad";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import Project from "./pages/Project";
import Informations from "./pages/Informations";
import SuccessForm from "./pages/SuccessForm";
import { useDispatch, useSelector } from "react-redux";
import { loadToken, selectToken } from "./store/tokenSlice";
import { displayTokens } from "./api/hashthruster";
import { useEffect } from "react";

const App = () => {
	const location = useLocation();
	const tokens = useSelector(selectToken)
	const dispatch = useDispatch()

	useEffect(()=>{
		if(tokens.allTokens.length === 0){
			displayTokens()
			.then((res)=>{
				if(res.status === 200){
					dispatch(loadToken(res.content.tokens))
				}
			})
			.catch(err=>console.log(err))
		}
	}, [])
	
	return (
		<>
			{location.pathname === "/" ? <HeaderHome /> : <Header />}
			<main
				//@ts-ignore 
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 1 }}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/submit' element={<Form />} />
					<Route path='/successProject' element={<SuccessForm />} />
					<Route path='/trends' element={<Trends />} />
					<Route path='/details/:id' element={<Detail />} />
					<Route path='/launchpad' element={<Launchpad />} />
					<Route path='/project/:id' element={<Project />} />
					<Route path='/informations' element={<Informations />} />
					<Route path='*' element={<Navigate to="/" />} />
				</Routes>
			</main>
			{location.pathname === "/" ? <Footer page="home"/> : <Footer page="other"/>}
		</>
	  )
}
export default App;