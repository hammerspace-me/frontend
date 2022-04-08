import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFile } from "@fortawesome/free-regular-svg-icons";
import { FC } from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

const ActiveLink: FC<LinkProps> = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: false });

  return (
    <Link to={to} className={match ? "nav-link active" : "nav-link"} {...props}>
      {children}
    </Link>
  );
};

const Sidebar: FC = () => {
  return (
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <ActiveLink to="/admin/backpack">
          <FontAwesomeIcon icon={faFile} />
          Backpack
        </ActiveLink>
      </li>
      <li>
        <ActiveLink to="/admin/applications">
          <FontAwesomeIcon icon={faBell} />
          Applications
        </ActiveLink>
      </li>
      <li>
        <ActiveLink to="/admin/activities">
          <FontAwesomeIcon icon={faBell} />
          Activities
        </ActiveLink>
      </li>
    </ul>
  );
};

export default Sidebar;
