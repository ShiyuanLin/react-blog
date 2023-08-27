import Logo from '../imgs/logo.png';

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="Logo picture" />
      <span>Made by Theo with <em>React.js</em></span>
    </footer>
  );
};

export default Footer;
