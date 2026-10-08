from pathlib import Path
import subprocess
import imageio_ffmpeg

root = Path(__file__).resolve().parents[1] / 'public' / 'brand' / 'videos-tms'
out = root / 'scrub'
out.mkdir(exist_ok=True)
encoder = imageio_ffmpeg.get_ffmpeg_exe()
assets = {
    'convergence': 'Circular_modules_connecting_into.mp4',
    'journey': 'Marker_moving_along.mp4',
    'resolution': 'Abstract_film_resolving_into_orde.mp4',
}
for name, source in assets.items():
    common = [encoder, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(root / source)]
    subprocess.run(common + ['-an', '-vf', 'scale=1280:-2,fps=24', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-g', '1', '-keyint_min', '1', '-bf', '0', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(out / (name + '.mp4'))], check=True)
    subprocess.run(common + ['-frames:v', '1', '-vf', 'scale=1280:-2', '-c:v', 'libwebp', '-quality', '86', str(out / (name + '.webp'))], check=True)
    print(name, (out / (name + '.mp4')).stat().st_size)
