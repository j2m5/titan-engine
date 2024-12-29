:: Run this file as admin

cd /d "%~dp0"
if exist src\images (
    echo Symlink already exists
) else (
    mklink /D src\images ..\storage\images
    echo Done
)