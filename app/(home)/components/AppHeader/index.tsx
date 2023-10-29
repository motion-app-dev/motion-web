import Link from 'next/link'
import { AppShellHeader, Title } from '@mantine/core'
import titleFont from '@/app/shared/titleFont'

const AppHeader = () => {
  return (
    <AppShellHeader py="xs">
      <Link href="/">
        <Title className={titleFont.className}>Motion</Title>
      </Link>
    </AppShellHeader>
  )
}

export default AppHeader
