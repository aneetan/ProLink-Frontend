import ProLinkVerticalLogo from "../assets/image/prolink.png"
import ProLinkHorizontalLogo from '../assets/image/prolink-name.png'

interface LogoProps {
   isName: boolean;
}
const Logo: React.FC<LogoProps> = ({isName}) => {
  return (
    <>
     {isName ? (
      <img src={ProLinkVerticalLogo} alt="ProLink Logo" className="h-12" />
     ): (
      <img src={ProLinkHorizontalLogo} alt="Prolink Logo" />
     )}
    </>
  )
}

export default Logo
