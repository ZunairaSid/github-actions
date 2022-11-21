import { ReactElement } from 'react';
import { Footer } from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';

interface IProps {
  children: ReactElement | ReactElement[];
}

export const Wrapper = ({ children }: IProps) => (
  <>
    <Navbar />
    <div
      style={{
        height: '100%',
        marginTop: '60px',
        marginBottom: '40px',
      }}
    >
      {children}
    </div>
    <Footer />
  </>
);
