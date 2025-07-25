import cls from './SplitContainer.module.scss';

export interface ISplitContainerProps extends React.PropsWithChildren {
  title: string;
}

export const SplitContainer: React.FC<ISplitContainerProps> = ({
  title,
  children,
}) => {
  return (
    <div className={cls.container}>
      <h1 className={cls.title}>{title}</h1>
      <div className={cls.content}>
        {children}
      </div>
    </div>
  );
};