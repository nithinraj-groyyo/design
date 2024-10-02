import { Grid, MenuItem, Skeleton } from '@mui/material'

const CategoriesLoader = () => {
  return (
    <Grid container spacing={2}>
        <Grid item>
            <div>
                {[1, 2, 3, 4].map((_, index) => (
                    <MenuItem key={index}>
                        <Skeleton
                            variant="text"
                            width={100}
                            height={30}
                            sx={{ marginRight: 2 }}
                        />
                        <Skeleton
                            variant="rectangular"
                            width={20}
                            height={30}
                        />
                    </MenuItem>
                ))}
            </div>
        </Grid>
        <Grid item>
            <div>
                {[1, 2, 3].map((_, index) => (
                    <MenuItem key={index}>
                        <Skeleton
                            variant="text"
                            width={120}
                            height={30}
                        />
                    </MenuItem>
                ))}
            </div>
        </Grid>
    </Grid>
  )
}

export default CategoriesLoader