import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';

export const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb className='font-secondary'>
    <Breadcrumb.Item href="/">Landing Page</Breadcrumb.Item>

    {paths.map((path, index) => {
        const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        
        return (
            <Breadcrumb.Item
            key={routeTo}
            active={isLast}
            as={isLast ? 'span' : Link}
            to={routeTo}
            >
            {path.charAt(0).toLocaleUpperCase() + path.slice(1)}
            </Breadcrumb.Item>
        );

    })}

    </Breadcrumb>
);
}