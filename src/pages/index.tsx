import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Cms from 'src/services/Cms';
import Slider from 'src/components/slider';
import Carousel from 'src/components/carousel';
import Ad from 'src/components/ad';

import { DEFAULT_LANGUAGE, KENTICO_HARDCODED_PAGES } from '$utils/constants';

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

function Home({ page }: IProps): JSX.Element | null {
  if (!page) return null;

  const renderComponent = (component: any) => {
    switch (component._kenticoItemType) {
      case 'slider':
        return <Slider key={component.id} data={component} />;
      case 'carousel':
        return <Carousel key={component.id} data={component} />;
      case 'ad':
        return <Ad key={component.id} data={component} />;
      default:
        return null;
    }
  };
  return (
    <div className="container mx-auto p-4">
      {page.components.map((component: any) => renderComponent(component))}
    </div>
  );
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const pageLocale = locale ?? DEFAULT_LANGUAGE;

  try {
    const [page, webConfig] = await Promise.allSettled([
      Cms.getPageContent(KENTICO_HARDCODED_PAGES.HOME, {
        params: {
          language: pageLocale,
        },
      }),
      Cms.getConfig(),
    ]);

    return {
      props: {
        page: page.status === 'fulfilled' ? page.value : null,
        webConfig: webConfig.status === 'fulfilled' ? webConfig.value : null,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Home;
