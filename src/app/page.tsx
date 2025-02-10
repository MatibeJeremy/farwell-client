import {Container} from "@mui/material";
import {UserRegistrationForm} from "@/app/components/auth/register/UserRegistrationForm";
import {ToastContainer} from "react-toastify";

export default function Home() {
  return (
      <>
      <ToastContainer
          position="bottom-right"
          style={{
              bottom: "130px",
              right: "17px",
          }}
          toastStyle={{
              backgroundColor: "FEFEFE",
              boxShadow:
                  "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
              maxWidth: "356px",
          }}
      />
      <Container sx={{
        width: "100vw",
        height: "90vh",
        display: "flex",
        marginTop: "2%"
      }}>
          <UserRegistrationForm/>
      </Container>
    </>
  );
}
