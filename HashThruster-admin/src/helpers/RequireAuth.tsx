import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAdmin, connectAdmin } from '../store/adminSlice';
import { loadProject, selectProject } from '../store/projectSlice';
import { Navigate, useParams } from 'react-router-dom';
import { checkMyToken, checkRefreshToken } from '../api/admin';
import { displayProjects } from '../api/project';
import { RequireAuth as RequireAuthProps } from '../types/hoc.types';
import { AuthPKI } from '../types/admin.types';
import { displayTokens } from '../api/token';
import { loadToken, selectToken } from '../store/tokenSlice';

const RequireAuth: React.FC<RequireAuthProps> = ({ children, auth, superAdmin }) => {
    const params = useParams();
    const adminState = useSelector(selectAdmin);
    const allProject = useSelector(selectProject);
    const allToken = useSelector(selectToken);
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchProjects = async (adminData: AuthPKI) => {
        try {
            const res = await displayProjects(adminData);
            if (res.status === 200) {
                dispatch(loadProject(res.content.projects));
            }
        } catch (err) {
            console.error("Failed to load projects:", err);
        }
    };

    const fetchTokens = async () => {
        try {
            const res = await displayTokens();
            if (res.status === 200) {
                dispatch(loadToken(res.content.tokens));
            }
        } catch (err) {
            console.error("Failed to load tokens:", err);
        }
    };

    const handleAuthentication = async () => {
        try {
            if (adminState.isLogged) {
                if (superAdmin && adminState.infos.role !== "superAdmin") {
                    setIsSuperAdmin(true);
                    return;
                }

                const refreshRes = await checkRefreshToken({
                    refreshToken: adminState.infos.refreshToken,
                    public_key: adminState.infos.public_key,
                    id: adminState.infos.id,
                    email: adminState.infos.email,
                    accessToken: adminState.infos.accessToken,
                    role: adminState.infos.role,
                });
                
                dispatch(connectAdmin({
                    ...adminState.infos,
                    accessToken: refreshRes.accessToken,
                }));

                if (allProject.allProjects.length === 0) {
                    await fetchProjects({ ...adminState.infos, accessToken: refreshRes.accessToken });
                }

                if (allToken.allTokens.length === 0) {
                    await fetchTokens();
                }

                setIsAuthenticated(true);
            } else {
                const token = window.localStorage.getItem("hash-token");
                if (!token) throw new Error("No token found");

                const res = await checkMyToken();
                if (res.status !== 200) throw new Error("Token check failed");

                const refreshRes = await checkRefreshToken({
                    refreshToken: null,
                    public_key: res.content.admin.public_key,
                    id: res.content.admin.id,
                    email: res.content.admin.email,
                    accessToken: null,
                    role: res.content.admin.role,
                });

                const myAdmin = {
                    ...res.content.admin,
                    refreshToken: refreshRes.status === 200 ? refreshRes.refreshToken : null,
                    accessToken: refreshRes.status === 200 ? refreshRes.accessToken : null,
                    token,
                };

                dispatch(connectAdmin(myAdmin));
                
                if (allProject.allProjects.length === 0) {
                    await fetchProjects(myAdmin);
                }

                if (allToken.allTokens.length === 0) {
                    await fetchTokens();
                }

                setIsAuthenticated(true);

                if (superAdmin && myAdmin.role !== "superAdmin") {
                    setIsSuperAdmin(true);
                    return;
                }
            }
        } catch (err) {
            console.error("Authentication failed:", err);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleAuthentication();
    }, [adminState.isLogged, dispatch]);

    if (loading) {
        return <p className="nothing">Loading...</p>;
    }

    if (!isAuthenticated && auth) {
        return <Navigate to="/login" />;
    }

    if (isSuperAdmin) {
        return <Navigate to="/" />;
    }

    return <>{React.cloneElement(children as React.ReactElement, { params })}</>;
};

export default RequireAuth;
