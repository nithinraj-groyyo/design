import { Box, Chip } from "@mui/material";

const ColorOption = ({ color, count, selectedColor }: { color: string; count: number; selectedColor: boolean }) => (
    <Box sx={{ position: 'relative' }}>
        <Box
            sx={{
                width: 48,
                height: 48,
                borderRadius: '8px',
                border: selectedColor ? '2px solid black' : "",
            }}
            className="!flex !justify-center !items-center"
        >
            <Box
                sx={{
                    width: 44,
                    height: 44,
                    backgroundColor: color,
                    borderRadius: '8px',
                    border: '2px solid white',
                    cursor: 'pointer',
                    display: 'inline-block',
                }}
            />
            {count > 0 && (
                <Chip
                    label={`${count}`}
                    size="small"
                    color="error"
                    sx={{ position: 'absolute', top: -5, right: -5 }}
                />
            )}
        </Box>
    </Box>
);


export default ColorOption;