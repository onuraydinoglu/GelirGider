const AppShell = ({ children }) => {
  return (
    <div className="app-surface">
      <div className="page-container">{children}</div>
    </div>
  );
};

export default AppShell;