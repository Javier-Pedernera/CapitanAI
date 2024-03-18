import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';


interface Props {
  step: { title: string, description: string, icon: any }
}


const CardUseApp: React.FC<Props> = ({ step }) => {
  return (
    <ParallaxProvider>
      <Parallax opacity={[1, 1]}>
        <div>
          <Card className='cardUse'>
            <CardHeader
              title={<div className='titleUsecard'>{step.title}</div>}
              avatar={<step.icon className='iconTitle' />}
            />
            <hr className='hrDiv' />
            <CardContent>
              <Typography variant="body1" className='descriptionUse'>{step.description}</Typography>
            </CardContent>
          </Card>
        </div>
      </Parallax>
    </ParallaxProvider>
  );
}

export default CardUseApp