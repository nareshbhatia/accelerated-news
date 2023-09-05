import { SimpleHeader } from './SimpleHeader';
import { render } from '../../test/test-utils';

describe('<Header />', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<SimpleHeader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
