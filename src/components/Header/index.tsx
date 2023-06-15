import { HeaderContainer, HeaderContent } from "./styles";

import levvaCoinsLogo from "../../assets/logo.svg";

import { CategoryModal } from "./CategoryModal";
import { TransactionModal } from "./TransactionModal";
import { MyProfileModal } from "./MyProfileModal";

export function Header() {
  

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={levvaCoinsLogo} alt="levva Coins" />

        <div>
          <CategoryModal />

          <TransactionModal />
        </div>

        <MyProfileModal/>
      </HeaderContent>
    </HeaderContainer>
  );
}
