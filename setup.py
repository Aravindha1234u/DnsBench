from setuptools import setup,find_packages
from glob import glob,iglob

setup(
    name='DnsBench',
    version='1.0.0',
    url='https://github.com/aravindha1234u/dnsbench',
    license='MIT',
    author='Aravindha Hariharan M, Kumaran S',
    author_email='aravindha1234u@gmail.com, kumaransubramanian0007@gmail.com',
    description='Multi-Threaded Python Application for Dns Benchmark',
    packages=['DnsBench'],
    include_package_data=True,
    install_requires=['Eel', 'pyinstaller',"beautifulsoup4", "requests", "dnspython","pyautogui"],
    python_requires='>=3.5',
    classifiers=[
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3.9',
        'Operating System :: Microsoft :: Windows',
        'Operating System :: POSIX :: Linux',
    ],
    entry_points={
        'console_scripts': [
            'DnsBench=DnsBench.__main__:main',
            'dnsbench=DnsBench.__main__:main'
        ],
    },
)