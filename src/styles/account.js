export const list = {
  width: 260,
  maxWidth: 360,
  bgcolor: "background.paper",
  position: "absolute",
  borderRadius: "20px",
  boxShadow: "0 0 3px rgba(0,0,0,0.5)",
  zIndex: 9999,
  transform: "translate(-60%)",

  "&:after": {
    content: '""',
    top: "-17px",
    right: "82px",
    position: "absolute",
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: "10px solid white",
    borderTop: "10px solid transparent",
  },
};

export const numOfNotif = {
  position: "absolute",
  width: 10,
  height: 10,
  bgcolor: "primary.main",
  top: 0,
  right: 0,
  borderRadius: "50%",
  color: "white",
  fontSize: 8,
  textAlign: "center",
};
export const panelControl = {
  position: "absolute",
  top: 0,
  right: 0,
  marginTop: "30px",
  display: "flex",
  alignItems: "center",
  marginRight: { lg: "100px", xs: "10px" },
};
