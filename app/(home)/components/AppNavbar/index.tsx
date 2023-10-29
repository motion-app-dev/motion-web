'use client'

import { AppShellNavbar, AppShellSection, Button } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import accountAPI from '@/app/apis/accountAPI'
import useAuthStore from '@/app/@auth/stores/useAuthStore'

const AppNavbar = () => {
  const logoutMutation = useMutation({
    ...accountAPI.logout(),
    onSettled() {
      useAuthStore.setState({}, true)
    }
  })

  return (
    <AppShellNavbar py="md">
      <AppShellSection grow></AppShellSection>
      <AppShellSection>
        <Button
          variant="default"
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}>
          Logout
        </Button>
      </AppShellSection>
    </AppShellNavbar>
  )
}

export default AppNavbar