import { Header } from './Header';
import { render } from '../../test/test-utils';

describe('<Header />', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
