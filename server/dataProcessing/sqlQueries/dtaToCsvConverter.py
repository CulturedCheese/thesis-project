#!/usr/bin/python -tt

import sys
import pandas as pd

def main():
  data = pd.io.stata.read_stata('OWWupdate1983_2008.dta')
  data.to_csv('allSalariesByCountry.csv')

if __name__ == '__main__':
  main()
