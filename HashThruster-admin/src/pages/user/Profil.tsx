import { useSelector } from "react-redux";
import { selectAdmin } from "../../store/adminSlice";
import { FormEvent, useEffect, useState } from "react";
import { getAllAdmin, registerAdmin, updateAdminPassword, updateAdminStatus } from "../../api/admin";
import emailjs from "@emailjs/browser";

const Profil = () => {
  const admin = useSelector(selectAdmin);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [role, setRole] = useState<string>("admin");
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [successPassword, setSuccessPassword] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [allAdmin, setAllAdmin] = useState<any[] | null>(null);

  const submitAdmin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!firstname || !lastname || !newEmail || !role) {
      setError("All fields must be completed");
      return;
    }
    const datas = {
      refreshToken: admin.infos.refreshToken,
      accessToken: admin.infos.accessToken,
      public_key: admin.infos.public_key,
      token: admin.infos.token,
      role: admin.infos.role,
      email: admin.infos.email,
      first_name: firstname,
      last_name: lastname,
      sendEmail: newEmail,
      sendRole: role
    };
    registerAdmin(datas)
      .then((res) => {
        if (res.status === 200) {
          setSuccess("Admin added successfully and email was sent!");
          const emailParams = {
            user_name: `${firstname} ${lastname}`,
            user_email: newEmail,
            message: `Your HashThruster administrator account has just been generated with the following credentials:
          email: ${newEmail}
          password: ${res.content.temporaryPassword}
          Please log in with your temporary password and change it in the profile area.`,
          };
          emailjs
            .send(import.meta.env.VITE_EMAILJS_SERVICEID, import.meta.env.VITE_EMAILJS_TEMPLATEID, emailParams, {
              publicKey: import.meta.env.VITE_EMAILJS_PUBLICKEY,
            })
            .then(() => {
              displayAdmins()
              setSuccess("Admin added successfully and email was sent!");
            })
            .catch(() => {
              setError("Error during email sending!");
            });
        } else {
          if(res.status === 400){
            setError("Error, admin already exist!")
          } else {
            setError("Oups, an error occured!")
          }
        }
      })
      .catch(() => {
        setError("Oups, an error occurred!");
      });
  };

  const changePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorPassword(null);
    setSuccessPassword(null);
    if (newPassword !== null) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (passwordRegex.test(newPassword)) {
        const data = {
          id: admin.infos.id,
          password: newPassword,
        };
        updateAdminPassword(data)
          .then((res) => {
            if (res.status === 200) {
              setSuccessPassword("Password updated successfully!");
            } else {
              setErrorPassword("Oups, an error occurred!");
            }
          })
          .catch(() => {
            setErrorPassword("Oups, an error occurred!");
          });
      } else {
        setErrorPassword(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      }
    }
  };

  const handleStatusChange = (idAdmin: string, newStatus: string) => {
    setErrorStatus(null);
    setSuccessStatus(null);

    const updatedAdmins = allAdmin?.map((admin) =>
      admin._id === idAdmin ? { ...admin, status: newStatus } : admin
    );

    setAllAdmin(updatedAdmins || []);

    const data = {
      id: idAdmin,
      refreshToken: admin.infos.refreshToken,
      public_key: admin.infos.public_key,
      email: admin.infos.email,
      accessToken: admin.infos.accessToken,
      role: admin.infos.role,
      status: newStatus,
    };

    updateAdminStatus(data)
      .then((res) => {
        if (res.status === 200) {
          setSuccessStatus("Status updated successfully!");
        } else {
          setErrorStatus("Oups, an error occurred!");
          const revertedAdmins = allAdmin?.map((admin) =>
            admin._id === idAdmin ? { ...admin, status: admin.status } : admin
          );
          setAllAdmin(revertedAdmins || []);
        }
      })
      .catch(() => {
        setErrorStatus("Oups, an error occurred!");
        const revertedAdmins = allAdmin?.map((admin) =>
          admin._id === idAdmin ? { ...admin, status: admin.status } : admin
        );
        setAllAdmin(revertedAdmins || []);
      });
  };

  const displayAdmins = () => {
    if (admin.infos.role === "superAdmin") {
      getAllAdmin(admin.infos)
        .then((res) => {
          if (res.status === 200) {
            setAllAdmin(res.content.admins);
          }
        })
        .catch(() => console.log("Oups, an error occurred"));
    }
  };
  

  useEffect(() => {
    displayAdmins();
  }, []);

  return (
    <section className="profile">
      <h1>My profile</h1>
      <div className="infos">
      <h2>General informations</h2>
      <p>
        <strong>full name: </strong>
        {admin.infos.first_name} {admin.infos.last_name}
      </p>
      <p>
        <strong>email: </strong>
        {admin.infos.email}
      </p>
      <p>
        <strong>status: </strong>
        {admin.infos.status}
      </p>
      
        <div className="udpatePassword">
          <h2>Update password</h2>
          {errorPassword !== null && <p className="error">{errorPassword}</p>}
          {successPassword !== null && <p className="success">{successPassword}</p>}
          <form className="form" onSubmit={changePassword}>
            <input
              id="firstname"
              type="text"
              onChange={(e) => {
                setNewPassword(e.currentTarget.value);
              }}
              placeholder="e.g., Azerty1234!"
            />
            <input type="submit" value="Send" />
          </form>
        </div>
        {admin.infos.role === "superAdmin" && (<div className="addAdmin">
            <h2>Add new admin</h2>
            {error !== null && <p className="error">{error}</p>}
            {success !== null && <p className="success">{success}</p>}
            <form className="form" onSubmit={submitAdmin}>
              <label htmlFor="firstname">Firstname</label>
              <input
                id="firstname"
                type="text"
                onChange={(e) => {
                  setFirstname(e.currentTarget.value);
                }}
                placeholder="e.g., John"
              />
              <label htmlFor="lastname">Lastname</label>
              <input
                id="lastname"
                type="text"
                onChange={(e) => {
                  setLastname(e.currentTarget.value);
                }}
                placeholder="e.g., Doe"
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                onChange={(e) => {
                  setNewEmail(e.currentTarget.value);
                }}
                placeholder="e.g., johndoe@email.com"
              />
              <label htmlFor="admin">Role</label>
              <select
                id="role"
                onChange={(e) => {
                  e.preventDefault();
                  setRole(e.currentTarget.value);
                }}
              >
                <option value="admin">Admin</option>
                <option value="superAdmin">Super Admin</option>
              </select>
              <input type="submit" value="Send" />
            </form>
        </div>)}
      </div>
      {admin.infos.role === "superAdmin" && (
        <div className="adminList">
          {allAdmin !== null && allAdmin.length > 0 && (
            <div className="adminStatus">
              <h2>Update status</h2>
              {errorStatus !== null && <p className="error">{errorStatus}</p>}
              {successStatus !== null && <p className="success">{successStatus}</p>}
              {allAdmin.map((admin) => (
                <div key={admin._id} className="adminCard">
                  <p>
                    {admin.first_name} {admin.last_name}
                  </p>
                  <p>{admin.email}</p>
                  <select
                    value={admin.status}
                    onChange={(e) =>
                      handleStatusChange(admin._id, e.currentTarget.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="validated">Validated</option>
                    <option value="blocked">Blocked</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>
              ))}
            </div>
          )}
          
        </div>
      )}
    </section>
  );
};

export default Profil;
